class Service < ApplicationRecord
  belongs_to :nutritionist
  belongs_to :location

  validates :name, presence: true
  validates :price, presence: true
  validates :price, numericality: { greater_than: 0 }
end
