Feature: Login flow for SauceDemo

  Background:
    Given I open the login page

  Scenario: Successful login
    When I login with username "standard_user" and password "secret_sauce"
    Then I should see the products page

  Scenario: Locked out user shows error
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message containing "Sorry, this user has been locked out." 
