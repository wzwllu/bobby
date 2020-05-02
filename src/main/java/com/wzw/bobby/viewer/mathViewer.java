package com.wzw.bobby.viewer;

import com.wzw.bobby.bean.MathList;
import com.wzw.bobby.service.doMathService;
import com.wzw.bobby.service.fixService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @ Author     ：wuzhengwei.
 * @ Date       ：Created in 19:59 2020/5/2
 * @ Description：
 * @ Modified By：
 * @Version: $
 */
@RestController
public class mathViewer {

    @RequestMapping(value = "/startMath",method = RequestMethod.POST)
    public String initDB(HttpServletRequest request,
                         @RequestParam(value = "count",defaultValue = "100")String count ,
                         @RequestParam(value = "addScale",defaultValue = "0")String addScale,
                         @RequestParam(value = "subScale",defaultValue = "0")String subScale ,
                         @RequestParam(value = "mutliScale",defaultValue = "0")String mutliScale,
                         @RequestParam(value = "divScale",defaultValue = "0")String divScale,
                         @RequestParam(value = "hard",defaultValue = "0")String hard,
                         @RequestParam(value = "addmax",defaultValue = "10")String addmax,
                         @RequestParam(value = "submax",defaultValue = "10")String submax,
                         @RequestParam(value = "mutlimax",defaultValue = "10")String mutlimax,
                         @RequestParam(value = "divmax",defaultValue = "10")String divmax
                         ) {
        try {
            List<MathList> list = new fixService(Integer.valueOf(count),
                    Integer.valueOf(addScale),
                    Integer.valueOf(subScale),
                    Integer.valueOf(mutliScale),
                    Integer.valueOf(divScale),
                    Integer.valueOf(hard),
                    Integer.valueOf(addmax),
                    Integer.valueOf(submax),
                    Integer.valueOf(mutlimax),
                    Integer.valueOf(divmax)).makeList();
            doMathService.addList(request.getSession().getId(), list);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }

    @RequestMapping(value = "/toMath",method = RequestMethod.POST)
    public MathList startToMath(HttpServletRequest request,
                              @RequestParam String no,
                                @RequestParam String ans
    ){
        MathList result = new MathList();
        try {
        if("0".equals(no)){
            result =doMathService.showCurMathList(request.getSession().getId(),Integer.valueOf(no));
        }else{
            doMathService.ansMath(Integer.valueOf(ans),request.getSession().getId(),Integer.valueOf(no));
            result =doMathService.showCurMathList(request.getSession().getId(),Integer.valueOf(no)+1);
        }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;

    }

    @RequestMapping(value = "/endtoMath",method = RequestMethod.POST)
    public List<MathList>  endToMath(HttpServletRequest request,
                                @RequestParam String no,
                                @RequestParam String ans
    ){
        List<MathList> result  = null;
        try {
            result = doMathService.showList(request.getSession().getId());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;

    }


}
