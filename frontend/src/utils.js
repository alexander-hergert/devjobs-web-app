// Function to save data to localStorage
export function saveDataToLocalStorage(key, data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Error saving data to localStorage: ${error}`);
  }
}

// Function to load data from localStorage
export function loadDataFromLocalStorage(key) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    const data = JSON.parse(serializedData);
    return data;
  } catch (error) {
    console.error(`Error loading data from localStorage: ${error}`);
    return null;
  }
}
