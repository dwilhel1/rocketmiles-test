export class HotelResponse {
  success: boolean;
  results: Hotels;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }

    this.results = new Hotels(args['results']);
  }
}

export class Hotels {
  hotels: Hotel[];
  total: number;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }

    this.hotels = [];
    if (args['hotels']) {
      args['hotels'].forEach(hotel => {
        this.hotels.push(new Hotel(hotel));
      });
    }
  }
}

export class Hotel {
  hotelStaticContent: HotelStaticContent;
  id: string;
  lowestAveragePrice: LowestAveragePrice;
  rewards: Rewards;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }

    this.hotelStaticContent = new HotelStaticContent(args['hotelStaticContent']);
    this.lowestAveragePrice = new LowestAveragePrice(args['lowestAveragePrice']);
    this.rewards = new Rewards(args['rewards']);
  }
}

export class HotelStaticContent {
  address: Address;
  brandCode: string;
  brandName: string;
  hotelId: number;
  languageCode: string;
  mainImage: Image;
  name: string;
  neighborhoodName: string;
  numberOfReviews: number;
  propertyType: number;
  propertyTypeName: string;
  rating: number;
  stars: number;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }

    this.address = new Address(args['address']);
    this.mainImage = new Image(args['mainImage']);
  }
}

export class Address {
  city: string;
  countryCode: string;
  countryName: string;
  latitude: number;
  line1: string;
  line2: string;
  longitude: number;
  stateCode: string;
  stateName: string;
  timeZoneId: string;
  zipCode: string;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }
  }
}

export class Image {
  category: string;
  source: string;
  url: string;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }
  }
}

export class LowestAveragePrice {
  amount: number;
  currency: string;
  symbol: string;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }
  }
}

export class Rewards {
  miles: number;

  constructor(args: any) {
    if (!args) {
      return null;
    }

    for (const field in args) {
      if (args.hasOwnProperty(field)) {
        this[field] = args[field];
      }
    }
  }
}
