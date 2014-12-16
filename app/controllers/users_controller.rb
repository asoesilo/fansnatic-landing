class UsersController < ApplicationController
  def create
    email = params['email']
    user = User.create email: email

    unless user.valid?
      messages = user.errors.messages
      isMoreThanOneError = messages.length > 1
      isNotEmailError = messages[:email].length == 0
      isNotDuplicateError = messages[:email].length > 1 || messages[:email][0] != "has already been taken"

      if isMoreThanOneError || isNotEmailError || isNotDuplicateError
        puts "Errors: #{messages}"
        head 400
      end
    else
      Mailer.send_email email
    end
    head :ok
  end
end
