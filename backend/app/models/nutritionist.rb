class Nutritionist < ApplicationRecord
    has_many :appointments
    has_many :services

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true

end
