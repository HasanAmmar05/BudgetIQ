const categories = {
    food: ['grocery', 'restaurant', 'cafe', 'meal', 'dinner', 'lunch', 'breakfast', 'snack'],
    transport: ['gas', 'fuel', 'uber', 'lyft', 'taxi', 'bus', 'train', 'subway', 'parking'],
    entertainment: ['movie', 'concert', 'theater', 'show', 'game', 'netflix', 'spotify'],
    utilities: ['electricity', 'water', 'gas', 'internet', 'phone', 'bill'],
    healthcare: ['doctor', 'hospital', 'medicine', 'pharmacy', 'dental', 'medical'],
    shopping: ['clothes', 'shoes', 'accessory', 'electronics', 'furniture', 'amazon'],
    education: ['book', 'course', 'tuition', 'school', 'college', 'university'],
    travel: ['hotel', 'flight', 'airbnb', 'vacation', 'trip'],
  };
  
  export function categorizeExpense(description) {
    const lowercaseDescription = description.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowercaseDescription.includes(keyword))) {
        return category;
      }
    }
    
    return 'other';
  }