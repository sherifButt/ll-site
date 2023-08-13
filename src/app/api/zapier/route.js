import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const props = await req.json();
        console.log('props', props);

        // const response = await fetch('https://hooks.zapier.com/hooks/catch/3482178/39r3y7v/silent', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(props),
        // });

        // console.log('Response status:', response.status);
        // console.log('Response body:', response)

        // if (!response.ok) {
        //     console.error('Error response from Zapier:', response.statusText);
        //     return NextResponse.error('Error sending request to Zapier');
        // }

        // // Check if the response has a JSON content type
        // const contentType = response.headers.get('Content-Type');
        // if (contentType && contentType.includes('application/json')) {
        //     // const json = await response.json();
        //     console.log('Zapier response:', json);
        //     return NextResponse.json(json);
        // } else {
        //     // If not JSON, return a suitable response
        //     return NextResponse.error('Zapier response is not in JSON format');
        // }
    } catch (error) {
        // console.error('An error occurred:', error);
        // return NextResponse.error('An unexpected error occurred');
    }
};
