import { supabaseConfig } from '../../config/supabase.js';

export const claimBalance = async (number) => {
  const endpoint = `${supabaseConfig.url}/rest/v1/rpc/get_transfer`;

  // Convertimos a número si es convertible, o lo enviamos como string
  const p_number = !isNaN(number) && !isNaN(parseFloat(number)) ? Number(number) : number;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseConfig.apiKey,
        'Authorization': `Bearer ${supabaseConfig.apiKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ p_number })
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
