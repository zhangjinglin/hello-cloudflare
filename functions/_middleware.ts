interface Env {
    bpb: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const url = new URL(context.request.url);
    
    // Only handle our specific API endpoint
    if (url.pathname === '/api/get-built-with') {
        try {
            // Read the value from KV
            const builtWith = await context.env.bpb.get('built-with');
            
            // Return the value or a default if not found
            return new Response(builtWith || 'Built with ❤️ and deployed on Cloudflare Pages');
        } catch (error) {
            return new Response('Error reading KV store', { status: 500 });
        }
    }

    // For all other requests, continue to the next middleware or static assets
    return context.next();
}