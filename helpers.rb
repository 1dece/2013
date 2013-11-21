helpers do

  def user_stats
    @user_stats ||= User.select(" COUNT(*) AS total,
      SUM(CASE gender WHEN 'male' THEN 1 ELSE 0 END) AS mens,
      SUM(CASE gender WHEN 'female' THEN 1 ELSE 0 END) AS womens").order("").first
  end

  def current_user(allow_new=false)
    nil unless validate_signed_request(params["fbid"])
    User.where(fbid: params["fbid"]).first || (allow_new ? User.new({fbid: params["fbid"]}) : nil)
  end

  def koala
    @oauth ||= Koala::Facebook::OAuth.new(ENV['FB_APP_ID'] || '593950217332942', ENV['FB_APP_SECRET'] || '890ebb7ed236dd83eaae239115a818b2')
  end

  def decoded_signed_request
    @decoded_signed_request ||= koala.parse_signed_request(params["signed_request"])
  end

  def validate_signed_request(user_fbid)
    decoded_signed_request["user_id"] == user_fbid
  end

  def reject!
    raise Sinatra::NotFound
  end
end
