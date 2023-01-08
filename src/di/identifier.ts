export const Identifier = {
  Config: Symbol('Config'),
  Domain: {
    Workout: Symbol('Domain.Workout'),
  },
  Repository: {
    RunningHistory: Symbol('Repository.RunningHistory'),
    RunningMenu: Symbol('Repository.RunningMenu'),
    User: Symbol('Repository.User'),
    WorkoutHistory: Symbol('Repository.WorkoutHistory'),
    WorkoutMenu: Symbol('Repository.WorkoutMenu'),
  },
  Infra: {
    Logger: Symbol('Infra.Logger'),
    Notify: Symbol('Infra.Notify'),
    Sound: Symbol('Infra.Sound'),
    Version: Symbol('Infra.Version'),
  },
  Server: {
    Api: Symbol('Server.Api'),
  },
  Handler: {
    Common: Symbol('Handler.Common'),
    Workout: Symbol('Handler.Workout'),
    Run: Symbol('Handler.Run'),
    Meal: Symbol('Handler.Meal'),
  }
}
