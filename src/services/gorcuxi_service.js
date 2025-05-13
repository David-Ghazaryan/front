import config from '../config/public';

const page = 1;
const limit = 1000;

class GorcUxiService {
  getSortedCompanies = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/company?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const sortedCompanies = data.data.sort(
        (a, b) => (b.jobs?.length || 0) - (a.jobs?.length || 0),
      );
      return sortedCompanies;
    } catch (error) {
      console.error('Error fetching sorted companies:', error);
      throw error;
    }
  };

  getAllPricing = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/pricing`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all pricing:', error);
      throw error;
    }
  };
  // getAllReviews = async () => {
  //   try {
  //     const response = await fetch(`${config.BACK_URL}/api/reviews`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     return data.data;
  //   } catch (error) {
  //     console.error('Error fetching all companies:', error);
  //     throw error;
  //   }
  // };

  getCompany = async (id) => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/company/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching company by ID:', error);
      throw error;
    }
  };
  getAllCompanies = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/company?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all companies:', error);
      throw error;
    }
  };
  getCompanies = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/company?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching all companies:', error);
      throw error;
    }
  };
  getAllJobs = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/job`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      throw error;
    }
  };

  getJob = async (id) => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/job/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching job by ID ${id}:`, error);
      throw error;
    }
  };
  // getIndustryById = async (id) => {
  //   try {
  //     const response = await fetch(`${config.BACK_URL}/api/industry/${id}`);
  //     if (!response.ok) {
  //       throw new Error('Industry not found');
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching industry:', error);
  //     throw error;
  //   }
  // };
  // _pricing = (pricing) => {
  //   return {
  //     id: pricing.id,
  //     title: pricing.title,
  //     price: pricing.price,
  //     maxJobCount: pricing.maxJobCount,
  //   };
  // };
  // _company = (company) => {
  //   return {
  //     id: company.id,
  //     title: company.title,
  //     mail: company.mail,
  //     logo: `${config.BACK_URL}${company.logo}`,
  //     backgroundImage: `${config.BACK_URL}${company.backgroundImage}`,
  //     phoneNumber: company.phoneNumber,
  //     minWorkes: company.minWorkes,
  //     maxWorkes: company.maxWorkes,
  //     description: company.description,
  //     location: company.location,
  //     city: company.city,
  //     webSite: company.webSite,
  //     jobs: company.jobs || [],
  //   };
  // };
}

export default GorcUxiService;
