class ApplicationController < ActionController::API
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
#   allow_browser versions: :modern

  rescue_from ActionController::ParameterMissing do |e|
    render json: { error: "Missing required parameter: #{e.param}" }, status: :bad_request
  end
end
