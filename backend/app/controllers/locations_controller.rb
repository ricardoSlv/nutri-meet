class LocationsController < ApplicationController
  def index
    @locations = Location.all
    render json: {
        locations: @locations,
        count: @locations.count
      }
  end
end
