import { supabaseConfig } from '../../config/supabase.js';

export const createTransfer = async ({ code, value, comment }) => {
  const endpoint = `${supabaseConfig.url}/rest/v1/rpc/create_transfer`;

  const numericValue = !isNaN(value) && !isNaN(parseFloat(value)) ? Number(value) : value;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseConfig.apiKey,
        'Authorization': `Bearer ${supabaseConfig.apiKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        code,
        value: numericValue,
        comment: comment ?? ''
      })
    });

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      data
    };
  } catch (error) {
    return {
      status: 500,
      data: {
        error: 'Error al comunicarse con Supabase',
        message: error.message
      }
    };
  }
};

export const deactivateTransferById = async (id) => {
  const endpoint = `${supabaseConfig.url}/rest/v1/rpc/deactivate_transfer_by_id`;

  const numericId = !isNaN(id) && !isNaN(parseFloat(id)) ? Number(id) : id;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseConfig.apiKey,
        'Authorization': `Bearer ${supabaseConfig.apiKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        p_id: numericId
      })
    });

    const contentType = response.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return {
      status: response.status,
      data
    };
  } catch (error) {
    return {
      status: 500,
      data: {
        error: 'Error al comunicarse con Supabase',
        message: error.message
      }
    };
  }
};
