export async function DelayerAsync(func: Promise<any>, delayBy: number) {
    const timeout = new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, delayBy);
    });
  
    return await Promise.all([timeout, func]);
  }

  export async function wait(delay: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, delay);
    });    
  }