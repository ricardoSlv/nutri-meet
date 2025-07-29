class NutricionistsController < ApplicationController
    def index
    @nutricionists = Nutricionist
                                 

    if filter_nutricionist_params[:search].present?
      @nutricionists = @nutricionists
      .joins(:services)
      .where('nutricionists.name LIKE ?', "%#{filter_nutricionist_params[:search]}%")
      .or(Nutricionist.joins(:services).where('services.name LIKE ?', "%#{filter_nutricionist_params[:search]}%"))
    end
    
    @nutricionists = @nutricionists.includes(services: :location).distinct
    
    nutricionists_json = @nutricionists.as_json(include: { services: { include: :location } })

    # Filter out services that don't match the search query if their nutricionist name doesn't match the search query either
    if filter_nutricionist_params[:search].present?
      nutricionists_json.each do |nutricionist|
        unless nutricionist['name'].downcase.include?(filter_nutricionist_params[:search].downcase)
        nutricionist['services'] = nutricionist['services']
        .select do |service|
          service['name'].downcase.include?(filter_nutricionist_params[:search].downcase)
        end
    end
      end
    end

    render json: {
        nutricionists: nutricionists_json,
        count: nutricionists_json.count
      }
  end

  def filter_nutricionist_params
    params.permit(:search)
  end
end
