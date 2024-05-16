function shuffleArray<T>(array: T[]): T[] {
     // Create a copy of the original array to avoid modifying it directly
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
         // Swap elements at indices i and j
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}

export default shuffleArray;