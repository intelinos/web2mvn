package servlets;

import beans.Data;
import beans.DataList;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.LinkedList;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String x_string = request.getParameter("x");
        String y_string = request.getParameter("y");
        String r_string = request.getParameter("r");

        double x;
        double y;
        double r;
        try {
            x = Double.parseDouble(x_string);
            x = Math.round(x * 10000.0) / 10000.0;
            y = Double.parseDouble(y_string);
            y = Math.round(y * 10000.0) / 10000.0;
            r = Double.parseDouble(r_string);
        } catch (NumberFormatException | NullPointerException e) {
            response.sendError(400);
            return;
        }

        boolean result = checkHit(x, y, r);
        HttpSession session = request.getSession();
        DataList dataList = (DataList) session.getAttribute("data");
        if (dataList == null) {
            dataList = new DataList();
        }
        if (dataList.getDataList() == null)
            dataList.setDataList(new LinkedList<>());

        Data data = new Data();
        data.setX(x);
        data.setY(y);
        data.setR(r);
        data.setResult(result);

        dataList.getDataList().addFirst(data);
        session.setAttribute("data", dataList);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        var out = response.getWriter();
        out.write(new Gson().toJson(data));
        out.close();
    }

    private boolean checkHit(double x, double y, double r) {
        if (x >= 0 && y >= 0 && y <= r - x)
            return true;
        if (x <= 0 && y >= 0 && x*x + y*y <= r*r)
            return true;
        if (x >= 0 && y <= 0 && y >= -r/2 && x <= r)
            return true;
        return false;
    }
}
