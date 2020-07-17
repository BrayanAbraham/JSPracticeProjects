class Github {
  constructor() {
    this.CLIENT_ID = "6a136b816447ef7799a5";
    this.CLIENT_SECRET = "4f92a246c9efb270e330240ee76384eff70c4e33";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}`
    );

    const profileData = await profileResponse.json();

    return {
      profile: profileData,
    };
  }
}
