// Health Data Calculation Utilities

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @param {number} age - Age in years
 * @param {string} gender - 'male' or 'female'
 * @returns {number} BMR in calories
 */
export function calculateBMR(weight, height, age, gender) {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * @param {number} bmr - Basal Metabolic Rate
 * @param {string} activityLevel - Activity level
 * @returns {number} TDEE in calories
 */
export function calculateTDEE(bmr, activityLevel) {
  const multipliers = {
    sedentary: 1.2,        // Little or no exercise
    light: 1.375,          // Light exercise 1-3 days/week
    moderate: 1.55,        // Moderate exercise 3-5 days/week
    active: 1.725,         // Heavy exercise 6-7 days/week
    veryActive: 1.9        // Very heavy exercise, physical job
  }
  
  return Math.round(bmr * (multipliers[activityLevel] || multipliers.moderate))
}

/**
 * Calculate daily calorie goal based on fitness goal
 * @param {number} tdee - Total Daily Energy Expenditure
 * @param {string} goal - Fitness goal
 * @returns {number} Daily calorie target
 */
export function calculateCalorieGoal(tdee, goal) {
  const adjustments = {
    'weight-loss': -500,      // Lose 0.5kg per week
    'aggressive-loss': -750,  // Lose 0.75kg per week
    'maintenance': 0,
    'muscle-gain': 300,       // Gain with minimal fat
    'bulk': 500              // Gain weight/muscle
  }
  
  return Math.round(tdee + (adjustments[goal] || 0))
}

/**
 * Calculate macro targets based on goal and body weight
 * @param {number} calories - Daily calorie target
 * @param {number} weight - Body weight in kg
 * @param {string} goal - Fitness goal
 * @returns {object} Macro targets (protein, carbs, fat in grams)
 */
export function calculateMacros(calories, weight, goal) {
  let proteinRatio, fatRatio, carbRatio
  
  switch (goal) {
    case 'weight-loss':
      proteinRatio = 0.35  // 35% protein
      fatRatio = 0.30      // 30% fat
      carbRatio = 0.35     // 35% carbs
      break
    case 'muscle-gain':
      proteinRatio = 0.30  // 30% protein
      fatRatio = 0.25      // 25% fat
      carbRatio = 0.45     // 45% carbs
      break
    case 'maintenance':
    default:
      proteinRatio = 0.30  // 30% protein
      fatRatio = 0.30      // 30% fat
      carbRatio = 0.40     // 40% carbs
  }
  
  return {
    protein: Math.round((calories * proteinRatio) / 4),      // 4 cal/g
    carbs: Math.round((calories * carbRatio) / 4),           // 4 cal/g
    fat: Math.round((calories * fatRatio) / 9)               // 9 cal/g
  }
}

/**
 * Adjust meal plan based on today's activity
 * @param {number} baseCalories - Base calorie target
 * @param {number} caloriesBurned - Extra calories burned today
 * @param {boolean} hadWorkout - Whether user had a workout
 * @returns {object} Adjusted targets
 */
export function adjustForActivity(baseCalories, caloriesBurned, hadWorkout) {
  // Add back 50-70% of exercise calories (conservative approach)
  const adjustmentFactor = hadWorkout ? 0.7 : 0.5
  const adjustment = Math.round(caloriesBurned * adjustmentFactor)
  
  return {
    adjustedCalories: baseCalories + adjustment,
    adjustment: adjustment,
    reason: hadWorkout 
      ? 'Added calories for workout recovery' 
      : 'Added calories for increased activity'
  }
}

/**
 * Calculate ideal water intake
 * @param {number} weight - Body weight in kg
 * @param {number} activityMinutes - Exercise minutes today
 * @returns {number} Water goal in liters
 */
export function calculateWaterIntake(weight, activityMinutes = 0) {
  // Base: 0.033L per kg body weight
  const baseWater = weight * 0.033
  
  // Add 0.5L per 30 minutes of exercise
  const exerciseWater = (activityMinutes / 30) * 0.5
  
  return Math.round((baseWater + exerciseWater) * 10) / 10
}

/**
 * Determine activity level from steps
 * @param {number} steps - Daily steps
 * @returns {string} Activity level
 */
export function getActivityLevelFromSteps(steps) {
  if (steps < 5000) return 'sedentary'
  if (steps < 7500) return 'light'
  if (steps < 10000) return 'moderate'
  if (steps < 12500) return 'active'
  return 'veryActive'
}

/**
 * Calculate calories burned from steps
 * @param {number} steps - Number of steps
 * @param {number} weight - Body weight in kg
 * @returns {number} Estimated calories burned
 */
export function caloriesFromSteps(steps, weight) {
  // Average: 0.04 calories per step per kg of body weight
  return Math.round(steps * 0.04 * (weight / 70))
}

/**
 * Get meal timing recommendations based on workout schedule
 * @param {string} workoutTime - 'morning', 'afternoon', 'evening', or 'none'
 * @returns {object} Meal timing advice
 */
export function getMealTiming(workoutTime) {
  const timing = {
    morning: {
      preWorkout: 'Light breakfast 1-2 hours before',
      postWorkout: 'Protein-rich breakfast within 30 minutes',
      emphasis: 'breakfast'
    },
    afternoon: {
      preWorkout: 'Balanced lunch 2-3 hours before',
      postWorkout: 'Snack with protein and carbs',
      emphasis: 'lunch'
    },
    evening: {
      preWorkout: 'Light snack 1 hour before',
      postWorkout: 'Protein-rich dinner within 1 hour',
      emphasis: 'dinner'
    },
    none: {
      preWorkout: null,
      postWorkout: null,
      emphasis: 'balanced'
    }
  }
  
  return timing[workoutTime] || timing.none
}

/**
 * Calculate recommended protein for workout days
 * @param {number} weight - Body weight in kg
 * @param {string} workoutType - 'strength', 'cardio', 'mixed', or 'rest'
 * @returns {number} Protein target in grams
 */
export function getProteinTarget(weight, workoutType) {
  const multipliers = {
    rest: 1.6,        // 1.6g per kg
    cardio: 1.8,      // 1.8g per kg
    mixed: 2.0,       // 2.0g per kg
    strength: 2.2     // 2.2g per kg
  }
  
  return Math.round(weight * (multipliers[workoutType] || multipliers.rest))
}

/**
 * Sync health data and calculate all targets
 * @param {object} userData - User profile data
 * @param {object} todayData - Today's activity data
 * @returns {object} Complete nutrition targets
 */
export function calculateDailyTargets(userData, todayData) {
  const { weight, height, age, gender, goal, activityLevel } = userData
  const { steps, caloriesBurned, hadWorkout, workoutType } = todayData
  
  // Calculate base values
  const bmr = calculateBMR(weight, height, age, gender)
  const tdee = calculateTDEE(bmr, activityLevel)
  const baseCalories = calculateCalorieGoal(tdee, goal)
  
  // Adjust for today's activity
  const { adjustedCalories, adjustment } = adjustForActivity(
    baseCalories, 
    caloriesBurned, 
    hadWorkout
  )
  
  // Calculate macros
  const macros = calculateMacros(adjustedCalories, weight, goal)
  
  // Adjust protein for workout
  if (hadWorkout) {
    macros.protein = Math.max(macros.protein, getProteinTarget(weight, workoutType))
  }
  
  // Calculate water
  const waterGoal = calculateWaterIntake(weight, todayData.exerciseMinutes || 0)
  
  return {
    calories: adjustedCalories,
    caloriesAdjustment: adjustment,
    protein: macros.protein,
    carbs: macros.carbs,
    fat: macros.fat,
    water: waterGoal,
    bmr,
    tdee
  }
}

export default {
  calculateBMR,
  calculateTDEE,
  calculateCalorieGoal,
  calculateMacros,
  adjustForActivity,
  calculateWaterIntake,
  getActivityLevelFromSteps,
  caloriesFromSteps,
  getMealTiming,
  getProteinTarget,
  calculateDailyTargets
}
