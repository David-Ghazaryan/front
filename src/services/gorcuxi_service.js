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
  getAllReview = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/review`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      throw error;
    }
  };

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
  getAllJobs = async ({
    q,
    page,
    limit,
    levels,
    industryIds,
    selectedSalary,
    cities,
    allowStudents,
    scheduleTypes,
  }) => {
    try {
      const queryParams = new URLSearchParams({
        q,
        page,
        limit,
        levels,
        industryIds,
        selectedSalary,
        cities,
        allowStudents,
        scheduleTypes,
      });
      const response = await fetch(`${config.BACK_URL}/api/job?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      throw error;
    }
  };
  getAllIndusty = async () => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/industry`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching all industry:', error);
      throw error;
    }
  };
  getAllUser = async ({
    page = 1,
    limit = 6,
    nameQ = '',
    industryName = '',
    city = '',
    gender = '',
    scheduleType = '',
    hasSalary = false,
    level = '',
  } = {}) => {
    try {
      const query = new URLSearchParams({
        page,
        limit,
        nameQ,
        industryName,
        city,
        gender,
        scheduleType,
        hasSalary,
        level,
      });
      const response = await fetch(`${config.BACK_URL}/api/user?${query.toString()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  };

  getUser = async (id) => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/user/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching user by ID ${id}:`, error);
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
  getSimilarJobs = async (industryId) => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/job/similar/${industryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching similar job by industry ${industryId}:`, error);
      throw error;
    }
  };
  getIndustryById = async (id) => {
    try {
      const response = await fetch(`${config.BACK_URL}/api/industry/${id}`);
      if (!response.ok) {
        throw new Error('Industry not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching industryId:', error);
      throw error;
    }
  };
}
export default GorcUxiService;
