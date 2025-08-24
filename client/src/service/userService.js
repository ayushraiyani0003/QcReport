/**
 * @fileoverview Client-side service for User List API operations
 * @version 1.0.0
 */

class UserListService {
  constructor(baseURL = "/api/users") {
    this.baseURL = baseURL;
  }

  async _makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string} userData.userName - Username (required)
   * @param {string} userData.name - Full name (required)
   * @param {'Admin'|'User'} userData.userRoll - User role (required)
   * @param {string} userData.joined - Join date (YYYY-MM-DD)
   * @param {string} userData.password - Password (6-255 chars)
   */
  async createUser(userData) {
    return await this._makeRequest(this.baseURL, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  /**
   * Get all users
   */
  async getAllUsers() {
    return await this._makeRequest(this.baseURL);
  }

  /**
   * Get a user by ID
   * @param {string} id - UUID of the user
   */
  async getUserById(id) {
    if (!id) throw new Error("User ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`);
  }

  /**
   * Update a user by ID
   * @param {string} id - UUID of the user
   * @param {Object} userData - Updated user data
   */
  async updateUser(id, userData) {
    if (!id) throw new Error("User ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  /**
   * Delete a user by ID (soft delete)
   * @param {string} id - UUID of the user
   */
  async deleteUser(id) {
    if (!id) throw new Error("User ID is required");
    return await this._makeRequest(`${this.baseURL}/${id}`, {
      method: "DELETE",
    });
  }

  /**
   * Validate user data on client side
   * @param {Object} userData - User data to validate
   */
  validateUserData(userData) {
    const errors = [];

    if (!userData.userName || !userData.userName.trim()) {
      errors.push("Username is required");
    }
    if (!userData.name || !userData.name.trim()) {
      errors.push("Full name is required");
    }
    if (!["Admin", "User"].includes(userData.userRoll)) {
      errors.push("Invalid user role");
    }
    if (!userData.joined) {
      errors.push("Join date is required");
    }
    if (!userData.password || userData.password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate UUID format
   */
  isValidUUID(uuid) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Format user for display
   */
  formatUserForDisplay(user) {
    return {
      ...user,
      displayName: `${user.name} (${user.userRoll})`,
      joinedDate: new Date(user.joined).toLocaleDateString(),
      createdAt: new Date(user.createdAt).toLocaleDateString(),
      updatedAt: new Date(user.updatedAt).toLocaleDateString(),
    };
  }

  /**
   * Format multiple users for display
   */
  formatUsersForDisplay(users) {
    return users.map((user) => this.formatUserForDisplay(user));
  }
}

export default UserListService;
