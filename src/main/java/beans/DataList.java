package beans;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.Objects;

public class DataList implements Serializable {
    private LinkedList<Data> dataList;

    public DataList(){}

    public LinkedList<Data> getDataList() {
        return dataList;
    }

    public Data getLastResult() {
        if (dataList != null && !dataList.isEmpty()) {
            return dataList.get(dataList.size() - 1);
        }
        return null;
    }

    public void setDataList(LinkedList<Data> dataList) {
        this.dataList = dataList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DataList)) return false;
        DataList list = (DataList) o;
        return getDataList().containsAll(((DataList) o).getDataList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getDataList());
    }

    @Override
    public String toString() {
        return "DataList{" +
                "DataList=" + dataList +
                '}';
    }
}
