class Location < ApplicationRecord
  has_many :services

  validates :address, presence: true
  validates :municipality, presence: true
  validates :district, presence: true
  validates :zipcode, presence: true
end
