# techtalk61
Material Design using AngularJs

# Installation
This app uses Rails as the backend, so you'll need ruby and rails installed. This app also uses bower, so you'll also need node and npm installed. But becaused most of the people attending the techtalk didn't understand about bower, so I don't put the `component` in `.gitignore`, means that you can use it directly without installing.
Note: For best practice the files in `assets/vendor/components` should be in `.gitignore`, and can be installed using `bower install`

When you have rails installed, do some migration for the database by using `rake db:migrate`, then you can use `rails s` to run the app.

## Note:
- `AjaxService` is created so we can swap ajax implementation later, you can still use `$http` or `$resource` or anything you want. This makes our app even more modular.
- The `TaskService` is made as simple as possible, it shouldn't be like that in real world app :D
- Feel free to contact me if you have any question.
