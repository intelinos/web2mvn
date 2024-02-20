package beans;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

public class Data implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean result;

    public Data(){}

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean getResult() {
        return result;
    }

    //public LocalDateTime getExecutedAt() {
    //    return executedAt;
   // }

    //public long getExecutionTime() {
     //   return executionTime;
    //}

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    //public void setExecutedAt(LocalDateTime executedAt) {
  //      this.executedAt = executedAt;
    //}

//    public void setExecutionTime(long executionTime) {
      //  this.executionTime = executionTime;
    //}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Data)) return false;
        Data data = (Data) o;
        return Double.compare(getX(), data.getX()) == 0 && Double.compare(getY(), data.getY()) == 0 &&
                Double.compare(getR(), data.getR()) == 0 && getResult() == data.getResult()/* &&
                getExecutionTime() == data.getExecutionTime() && getExecutedAt().isEqual(data.getExecutedAt()*/;
    }

    @Override
    public int hashCode() {
        return Objects.hash(getX(), getY(), getR(), getResult()/*, getExecutionTime(), getExecutedAt()*/);
    }

    @Override
    public String toString() {
        return "Data{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                /*", executionTime=" + executionTime +
                ", executedAt=" + executedAt +*/
                '}';
    }

}
