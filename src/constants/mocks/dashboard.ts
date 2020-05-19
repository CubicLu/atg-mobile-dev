export const dashboardMock = {
  analytic: [
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/dashboard/total-revenue.png'
    },
    {
      image:
        'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/dashboard/change-supportes.png'
    }
  ]
};

export const walletMock = [
  {
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/dashboard/total-revenue.png',
    route: '/dashboard/:artistId/sales'
  },
  {
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/dashboard/change-supportes.png',
    route: '/dashboard/:artistId/supporter'
  }
];

export const analyticsMock = [
  {
    dashboardSalesPlaceholder:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/dashboard/sales-placeholder.png'
  },
  {
    dashboardSalesCountryPlaceholder:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/dashboard/sales-countries-placeholder.png'
  }
];

export const dashboardSupporters = [
  {
    name: 'Amanda',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/amanda.jpg',
    time: '24 months',
    city: 'London, UK',
    country: 'GB',
    followers: 100
  },
  {
    name: 'Brian',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/brian.jpg',
    time: '18 months',
    city: 'Toronto, CA',
    country: 'CA',
    followers: 80
  },
  {
    name: 'Chris',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/dexter.jpg',
    time: '16 months',
    city: 'California, US',
    country: 'US',
    followers: 60
  },
  {
    name: 'Damiana',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/chris.jpg',
    time: '24 months',
    city: 'New York, US',
    country: 'US',
    followers: 100
  },
  {
    name: 'Eleonore',
    time: '18 months',
    city: 'Montreal, CA',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/eleonore.jpg',
    country: 'CA',
    followers: 80
  },
  {
    name: 'Gabriela',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/gabriela.jpg',
    time: '16 months',
    city: 'Michigan, US',
    country: 'US',
    followers: 60
  },
  {
    name: 'Felipe',
    image:
      'https://frontend-mocks.s3-us-west-1.amazonaws.com/mocks/profile/harold.jpg',
    time: '10 months',
    city: 'Miami, US',
    country: 'US',
    followers: 10
  }
];
