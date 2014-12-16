class UsersController < ApplicationController
  def create
    email = params['email']
    user = User.create email: email
    return head 400 unless user.valid?

    # Mailer.send_email email
    head :ok
  end
end
