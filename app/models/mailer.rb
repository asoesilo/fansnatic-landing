class Mailer
  class << self
    require 'mandrill'
    MANDRILL = Mandrill::API.new ENV['MANDRILL_API_KEY']
    TEMPLATE_NAME = 'sign-up'
    TEMPLATE_CONTENT = nil
    ASYNC = false

    def send_email email
      message = {
        "track_opens" => true,
        "to" => [{"email" => email, "type" => "to"}]
      }

      result = MANDRILL.messages.send_template TEMPLATE_NAME, TEMPLATE_CONTENT, message, ASYNC

      return if result[0]["status"] == "sent"
      # TODO: Handle other status / rejections
    end
  end
end
