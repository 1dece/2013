require 'active_record'

class User < ActiveRecord::Base

  validates :fbid, :presence => true
  validates :name, :presence => true

  def to_geohash
    return nil unless self.latitude && self.longitude
    {
      type: "Feature",
      properties: {
        name: self.name.to_s
      },
      geometry: {
        type: "Point",
        coordinates: [self.longitude, self.latitude]
      }}
  end

end
