function KeyPress(e) {
      var evtobj = window.event? event : e;
      // Ctrl+Z
      if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
          titleElement = document.getElementById('upFunction_h_addsubjects_upModal_upmodal_subjectdata_ctl02_Subject_data_for_schedule_upParent_tab_ctl00_upAddSubjects');
          titleH2 = titleElement.getElementsByTagName('h2')[0];
          title = titleH2.innerHTML.split('<br>')[0];
          title = title.split(' (')[0];

          table = document.getElementById('Addsubject_course1_gridCourses_bodytable');
          tbody = table.getElementsByClassName('scrollablebody')[0];

          strToCopy = "";
          for (i = 0; i < tbody.children.length; i++) {
              curr = tbody.children[i];
              course = curr.children[1].children[0].innerHTML;
              courseType = curr.children[2].innerHTML == "Gyakorlat" ? "gy" : "ea";
              //
              moreInfo = curr.children[6].innerHTML;
              day = moreInfo.split(":")[0];
              //
              indexOfFirstColon = moreInfo.indexOf(':');
              indexOfFirstWhitespace = moreInfo.indexOf(' ');
              time = moreInfo.substring(indexOfFirstColon+1, indexOfFirstWhitespace);
              //
              place = moreInfo.substring(indexOfFirstWhitespace+1, moreInfo.length-1);
              //
              teacher = curr.children[7].innerHTML;
              //
              strToCopy += (title + "$" + course + "$" + courseType + "$" + teacher + "$" + day  + "$" + time + "$" + place + "\r\n");
          }
          prompt("Ctrl+C", strToCopy);
      }
}