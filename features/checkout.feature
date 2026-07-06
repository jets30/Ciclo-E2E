Feature: Checkout flow for SauceDemo

  Background:
    Given I open the login page
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  @smoke @regression
  Scenario: Successful checkout
    When I add the first product to the cart
    And I proceed to checkout with "Goku" "Sayayin" "11000"
    Then I should see the order complete message

  @regression
  Scenario: Checkout fails with missing first name
    When I add the first product to the cart
    And I proceed to checkout with "" "Sayayin" "11000"
    Then I should see an error containing "Error: First Name is required"
