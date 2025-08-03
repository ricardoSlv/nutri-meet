require "test_helper"

class NutritionistsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @location = locations(:vilaVerde)
  end

  test "should get index" do
    get nutritionists_url
    assert_response :success
    assert_not_nil JSON.parse(response.body)["nutritionists"]
    assert_not_nil JSON.parse(response.body)["count"]
  end

  test "should not return nutricionist-service pairs that dont match the search" do
    get nutritionists_url, params: { search: "pe" }
    assert_response :success
    response_body = JSON.parse(response.body)

    response_body["nutritionists"].each do |nutritionist|
        unless nutritionist["name"].downcase.include?("pe")
            nutritionist["services"].each do |service|
                assert service["name"].downcase.include?("pe"), "Service #{service["name"]} from nutritionist #{nutritionist["name"]} should not be included in the search  'pe'"
            end
        end
    end
  end

  #TODO
  test "should get index with location filter" do
    get nutritionists_url, params: { location_id: @location.id }
    assert_response :success
    response_body = JSON.parse(response.body)
    assert_not_nil response_body["nutritionists"]
    assert_not_nil response_body["count"]
  end
end
