package com.wzw.bobby.viewer;

import com.wzw.bobby.bean.MathList;
import com.wzw.bobby.bean.MathShow;
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
    public MathShow initDB(HttpServletRequest request,
                         @RequestParam(value = "count",defaultValue = "100")String count ,
                         @RequestParam(value = "addScale",defaultValue = "25")String addScale,
                         @RequestParam(value = "subScale",defaultValue = "25")String subScale ,
                         @RequestParam(value = "mutliScale",defaultValue = "25")String mutliScale,
                         @RequestParam(value = "divScale",defaultValue = "25")String divScale,
                         @RequestParam(value = "hard",defaultValue = "100")String hard,
                         @RequestParam(value = "addmax",defaultValue = "100")String addmax,
                         @RequestParam(value = "submax",defaultValue = "100")String submax,
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
            System.out.println(list.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return continueToMath(request);
    }

    @RequestMapping(value = "/toMath",method = RequestMethod.POST)
    public MathShow startToMath(HttpServletRequest request,
                              @RequestParam String no,
                                @RequestParam String ans
    ){
        try {
            doMathService.ansMath(Integer.valueOf(ans),request.getSession().getId(),Integer.valueOf(no));
                 } catch (Exception e) {
            e.printStackTrace();
        }
        return continueToMath(request);

    }

    @RequestMapping(value = "/endtoMath",method = RequestMethod.POST)
    public List<MathList>  endToMath(HttpServletRequest request
    ){

        List<MathList> result  = null;
        try {
            result = doMathService.showList(request.getSession().getId());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;

    }

    @RequestMapping(value = "/continueMath",method = RequestMethod.POST)
    public MathShow  continueToMath(HttpServletRequest request ){
        MathList result = null;
        int doMath=0;
        try {
            doMath = doMathService.theDo(request.getSession().getId(),true);
            result =doMathService.showCurMathList(request.getSession().getId(),doMath);

        } catch (Exception e) {
            e.printStackTrace();

        }
        if(result==null){
            result = new MathList(25,25,425,3);
        }
        MathShow mathShow = new MathShow();

        mathShow.setMax(String.valueOf(result.getList()[0]));
        mathShow.setMin(String.valueOf(result.getList()[1]));
        mathShow.setCount(String.valueOf(result.getList()[2]));
        mathShow.setFlag(String.valueOf(result.getFlag()));
        mathShow.setNo(String.valueOf(doMath));
        if(result.getKong()==0){
            mathShow.setMax("");
        }else if(result.getKong()==1){
            mathShow.setMin("");
        }else if(result.getKong()==2){
            mathShow.setCount("");
        }

        return mathShow;

    }

}
