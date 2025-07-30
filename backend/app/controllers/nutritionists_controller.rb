class NutritionistsController < ApplicationController
    def index
    @nutritionists = Nutritionist
                                 

    if filter_nutritionist_params[:search].present?
      @nutritionists = @nutritionists
      .joins(:services)
      .where('nutritionists.name LIKE ?', "%#{filter_nutritionist_params[:search]}%")
      .or(Nutritionist.joins(:services).where('services.name LIKE ?', "%#{filter_nutritionist_params[:search]}%"))
    end
    
    @nutritionists = @nutritionists.includes(services: :location).distinct
    
    nutritionists_json = @nutritionists.as_json(include: { services: { include: :location } })

    # Filter out services that don't match the search query if their nutritionist name doesn't match the search query either
    if filter_nutritionist_params[:search].present?
      nutritionists_json.each do |nutritionist|
        unless nutritionist['name'].downcase.include?(filter_nutritionist_params[:search].downcase)
        nutritionist['services'] = nutritionist['services']
        .select do |service|
          service['name'].downcase.include?(filter_nutritionist_params[:search].downcase)
        end
    end
      end
    end

    render json: {
        nutritionists: nutritionists_json,
        count: nutritionists_json.count
      }
  end

  def filter_nutritionist_params
    params.permit(:search)
  end
end
