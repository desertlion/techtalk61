class TasksController < ApplicationController
  def index
    @tasks = Task.all
    render json: @tasks
  end
  def create
    @task = Task.new(:task=>params[:task],:completed=>false)
    @task.save
    render json: @task
  end
  def show
    @task = Task.find(params[:id])
    render json: @task
  end
  def destroy
    @task = Task.destroy(params[:id])
    render json: @task
  end
end
