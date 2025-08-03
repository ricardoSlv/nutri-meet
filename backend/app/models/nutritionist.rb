class Nutritionist < ApplicationRecord
    has_many :appointments
    has_many :services

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true

    def self.search(search, location_id)
        # left_joins is used to get all nutritionists, even if they don't have any services or locations
        @nutritionists = Nutritionist.left_joins(services: :location)

        if @location_filter.present?
          @nutritionists = @nutritionists.where(services: { location_id: @location_filter })
        end

        if @search_filter.present?
          @nutritionists = @nutritionists
          .where("nutritionists.name ILIKE ?", "%#{@search_filter}%")
          .or(Nutritionist.left_joins(services: :location).where("services.name ILIKE ?", "%#{@search_filter}%"))
        end

        @nutritionists.distinct
    end
end
