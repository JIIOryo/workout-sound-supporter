import {Domain, Util} from '@/types'

export namespace GetWorkoutMenuList {
  export type Request = {}
  export type Response = {
    list: {
      id: Domain.Workout.WorkoutMenuId
      name: string
      description: string
      units: Domain.Workout.WorkoutMenuUnit[]
      createdAt: Util.Number.Timestamp
      updatedAt: Util.Number.Timestamp
    }[]
  }
}

export namespace GetMenu {
  export type Request = {}
  export type Response = {
    menu: {
      id: Domain.Workout.WorkoutMenuId
      name: string
      description: string
      units: Domain.Workout.WorkoutMenuUnit[]
      createdAt: Util.Number.Timestamp
      updatedAt: Util.Number.Timestamp
    }
  }
  export type Params = {
    id: Domain.Workout.WorkoutMenuId
  }
}

export namespace CreateWorkoutMenu {
  export type Request = {
    name: string
    description: string
    units: Domain.Workout.WorkoutMenuUnit[]
  }
  export type Response = {}
}

export namespace UpdateWorkoutMenu {
  export type Request = {
    id: Domain.Workout.WorkoutMenuId
    name: string
    description: string
    units: Domain.Workout.WorkoutMenuUnit[]
  }
  export type Response = {}
  export type Params = {
    id: Domain.Workout.WorkoutMenuId
  }
}

export namespace DeleteWorkoutMenu {
  export type Request = {
    id: Domain.Workout.WorkoutMenuId
  }
  export type Response = {}
  export type Params = {
    id: Domain.Workout.WorkoutMenuId
  }
}

export namespace PlayWorkout {
  export type Request = {
    id: Domain.Workout.WorkoutMenuId
    userId: Domain.User.UserId
  }
  export type Response = {}
}

export namespace GetWorkoutHistoryList {
  export type Request = {}
  export type Response = {
    list: {
      id: Domain.Workout.WorkoutMenuId
      name: string
      description: string
      units: Domain.Workout.WorkoutMenuUnit[]
      createdAt: Util.Number.Timestamp
      updatedAt: Util.Number.Timestamp
    }[]
  }
}
