/**
 * Get all unique categories from the college data
 * @param {Object} collegeData - The full college data object
 * @returns {Array} - Array of unique category codes
 */
export const getUniqueCategories = (collegeData) => {
  const categories = new Set();
  
  collegeData.institutes.forEach(instituteObj => {
    const institute = instituteObj.institute;
    
    institute.branches.forEach(branch => {
      Object.keys(branch.seat_allocations).forEach(allocationType => {
        const allocation = branch.seat_allocations[allocationType];
        if (allocation && allocation.categories) {
          Object.keys(allocation.categories).forEach(category => {
            categories.add(category);
          });
        }
      });
    });
  });
  
  return Array.from(categories).sort();
};

/**
 * Find colleges where the user's rank meets the cutoff criteria
 * @param {Object} collegeData - The full college data object
 * @param {Number} userRank - The user's rank
 * @param {String} userCategory - The user's category code
 * @returns {Array} - Array of eligible colleges with branches
 */
export const findEligibleColleges = (collegeData, userRank, userCategory) => {
  const eligibleColleges = [];
  
  collegeData.institutes.forEach(instituteObj => {
    const institute = instituteObj.institute;
    const eligibleBranches = [];
    
    institute.branches.forEach(branch => {
      let isEligible = false;
      
      Object.keys(branch.seat_allocations).forEach(allocationType => {
        const allocation = branch.seat_allocations[allocationType];
        if (allocation && allocation.categories && allocation.categories[userCategory]) {
          const cutoffRank = allocation.categories[userCategory].rank;
          if (userRank <= cutoffRank) {
            isEligible = true;
          }
        }
      });
      
      if (isEligible) {
        eligibleBranches.push({
          code: branch.code,
          name: branch.name,
          cutoffs: branch.seat_allocations
        });
      }
    });
    
    if (eligibleBranches.length > 0) {
      eligibleColleges.push({
        code: institute.code,
        name: institute.name,
        university: institute.university,
        status: institute.status,
        admission_type: institute.admission_type,
        eligible_branches: eligibleBranches
      });
    }
  });
  
  return eligibleColleges;
};

/**
 * Find a specific college by its code
 * @param {Object} collegeData - The full college data object
 * @param {String} collegeCode - The college code to find
 * @returns {Object|null} - The college object or null if not found
 */
export const findCollegeByCode = (collegeData, collegeCode) => {
  const institute = collegeData.institutes.find(
    instituteObj => instituteObj.institute.code === collegeCode
  );
  
  return institute ? institute.institute : null;
};

/**
 * Get the lowest rank for a specific category across all colleges
 * @param {Object} collegeData - The full college data object
 * @param {String} category - The category code
 * @returns {Number|null} - The lowest rank or null if not found
 */
export const getLowestRankForCategory = (collegeData, category) => {
  let lowestRank = null;
  
  collegeData.institutes.forEach(instituteObj => {
    const institute = instituteObj.institute;
    
    institute.branches.forEach(branch => {
      Object.keys(branch.seat_allocations).forEach(allocationType => {
        const allocation = branch.seat_allocations[allocationType];
        if (allocation && allocation.categories && allocation.categories[category]) {
          const rank = allocation.categories[category].rank;
          if (lowestRank === null || rank < lowestRank) {
            lowestRank = rank;
          }
        }
      });
    });
  });
  
  return lowestRank;
}; 