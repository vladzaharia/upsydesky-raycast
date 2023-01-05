export class Timer {
    private _startTime: Date;
    private _endTime: Date;
    private _interval: Interval;

    constructor(interval: Interval, startTime: Date = new Date(), endTime?: Date) {
        this._startTime = startTime;
        this._interval = interval;

        if (endTime) {
            this._endTime = endTime;
        } else {
            let intervalNum = 0;

            switch (interval) {
                case "1m":
                    intervalNum = 60 * 1000;
                    break;
                case "5m":
                    intervalNum = 5 * 60 * 1000;
                    break;
                case "15m":
                    intervalNum = 15 * 60 * 1000;
                    break;
                case "30m":
                    intervalNum = 30 * 60 * 1000;
                    break;
                case "1h":
                    intervalNum = 60 * 60 * 1000;
                    break;
                case "2h":
                    intervalNum = 2 * 60 * 60 * 1000;
                    break;
                case "4h":
                    intervalNum = 4 * 60 * 60 * 1000;
                    break;
                case "12h":
                    intervalNum = 12 * 60 * 60 * 1000;
                    break;
                case "24h":
                    intervalNum = 24 * 60 * 60 * 1000;
                    break;
            }

            this._endTime = new Date(this._startTime.getTime() + intervalNum);
        }        
    }

    public hasExpired(): boolean {
        return new Date().getTime() > this._endTime.getTime();
    }

    public getStartTime(): Date {
        return this._startTime;
    }

    public getEndTime(): Date {
        return this._endTime;
    }

    public getRemainingString(): string {
        if (this.hasExpired()) {
            return "Time's up!";
        } else {
            // todo: make this remaining, not end time
            return this._endTime.toLocaleTimeString("en-us");
        }
    }

    public getIntervalString(): string {
        if (this._interval === "1m" || this._interval === "1h") {
            return this._interval.replace("1m", "1 minute").replace("1h", "1 hour");
        } else {
            return this._interval.replace("m", " minutes").replace("h", " hours");
        }
    }

    public getSerializedObject() {
        return {
            startTime: this._startTime,
            endTime: this._endTime,
            interval: this._interval
        }
    }
}

export type Interval = "1m" | "5m" | "15m" | "30m" | "1h" | "2h" | "4h" | "12h" | "24h";