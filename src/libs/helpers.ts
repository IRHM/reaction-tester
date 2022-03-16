export default class Helpers {
  public static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static randomNumFromRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public static avg(nums: number[]) {
    return Math.round(nums.reduce((a, b) => a + b) / nums.length);
  }
}
