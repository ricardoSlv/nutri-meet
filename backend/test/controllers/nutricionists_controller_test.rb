require "test_helper"

class NutricionistsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get nutricionists_index_url
    assert_response :success
  end
end
