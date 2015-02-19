class AnnouncementsController < ApplicationController
    def index
        @announcement = Announcement.all
        render json: @announcement
    end
    def create
        @announcement = Announcement.new(:title=>params[:title],:description=>params[:description])
        @announcement.save
        render json: @announcement
    end
    def destroy
        @announcement = Announcement.destroy(params[:id])
        render json: @announcement
    end
end
