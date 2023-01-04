export const Identifier = {
  Config: Symbol('Config'),
  Repository: {
    RunningHistory: Symbol('Repository.RunningHistory'),
    RunningMenu: Symbol('Repository.RunningMenu'),
    User: Symbol('Repository.User'),
    WorkoutHistory: Symbol('Repository.WorkoutHistory'),
    WorkoutMenu: Symbol('Repository.WorkoutMenu'),
  },
  Infra: {
    Logger: Symbol('Infra.Logger'),
  },
  Server: {
    Api: Symbol('Server.Api'),
  },
  Handler: {
    Workout: Symbol('Handler.Workout'),
    Run: Symbol('Handler.Run'),
    Meal: Symbol('Handler.Meal'),
  }
}
