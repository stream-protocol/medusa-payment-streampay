export class Logger {
    private context: string;
  
    constructor(context: string) {
      this.context = context;
    }
  
    private formatMessage(level: string, message: string): string {
      const date = new Date().toISOString();
      return `${date} [${level}] [${this.context}]: ${message}`;
    }
  
    public info(message: string): void {
      console.info(this.formatMessage('INFO', message));
    }
  
    public error(message: string, error?: Error): void {
      console.error(this.formatMessage('ERROR', message), error);
    }
  
    // Add other log levels as needed (e.g., debug, warn, etc.)
  }
  