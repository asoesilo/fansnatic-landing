class HomeController < ApplicationController
  def index
    background_image = []
    background_image << 'http://www.trbimg.com/img-536a5f52/turbine/chi-michael-jordan-the-shot-turns-25-20140507'
    background_image << 'http://www.thebaseballjournal.com/wp-content/uploads/2014/02/Joe-Carter.jpg'
    background_image << 'http://static.nfl.com/static/content/public/image/getty/2012/09000d5d8261fc26.jpg'
    @random_background = background_image.sample
  end
end
