class NutritionistsController < ApplicationController
    def index
        @location_filter = filter_nutritionist_params[:location_id]
        @search_filter = filter_nutritionist_params[:search]

        nutritionists_json = Rails.cache.fetch("nutritionists-search:#{@search_filter}-location:#{@location_filter}", expires_in: 1.minute) do
        
        @nutritionists = Nutritionist.search(@search_filter, @location_filter)
        nutritionists_json = @nutritionists.as_json(include: { services: { include: :location } })

        # Filter out services that don't match the search query if their nutritionist name doesn't match the search query either
        if @search_filter.present?
        nutritionists_json.each do |nutritionist|
           unless @search_filter.present? && nutritionist["name"].downcase.include?(@search_filter.downcase)
            nutritionist["services"] = nutritionist["services"].select do |service|
                service["name"].downcase.include?(@search_filter.downcase)
            end
           end
          end
        end

        # Filter out services that don't match the location query
        if @location_filter.present?
          nutritionists_json.each do |nutritionist|
            nutritionist["services"] = nutritionist["services"].select do |service|
              service["location"]["id"] == @location_filter.to_i
            end
          end
        end

        nutritionists_json
    end

    render json: {
        nutritionists: nutritionists_json,
        count: nutritionists_json.count
      }
  end

  def filter_nutritionist_params
    params.permit(:search, :location_id)
  end
end
