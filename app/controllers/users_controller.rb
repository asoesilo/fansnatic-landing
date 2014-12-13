class UsersController < ApplicationController
  def create
    user = User.create email: params['email']
    if user.valid? then head :ok else head 400 end
  end
end
