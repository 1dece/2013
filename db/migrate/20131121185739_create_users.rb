class CreateUsers < ActiveRecord::Migration
	def self.up
		create_table :users do |t|
			t.string :fbid, uniq: true
			t.string :name
			t.string :gender
			t.string :location
			t.float :longitude
			t.float :latitude
			t.integer :character
		end

		add_index :users, :fbid
	end

	def self.down
		drop_table :users
	end
end
