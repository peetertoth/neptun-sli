function KeyPress(e) {
      var evtobj = window.event? event : e;
      // Ctrl+Z
      if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
          var titleElement = document.getElementById('upFunction_h_addsubjects_upModal_upmodal_subjectdata_ctl02_Subject_data_for_schedule_upParent_tab_ctl00_upAddSubjects');
          var titleH2 = titleElement.getElementsByTagName('h2')[0];
          var title = titleH2.innerHTML.split('<br>')[0];
          var title = title.split(' (')[0];

          var table = document.getElementById('Addsubject_course1_gridCourses_bodytable');
          var tbody = table.getElementsByClassName('scrollablebody')[0];

          var strToCopy = "";
          for (i = 0; i < tbody.children.length; i++) {
              var curr = tbody.children[i];
              var course = curr.children[1].children[0].innerHTML;
              var courseType = curr.children[2].innerHTML == "Gyakorlat" ? "gy" : "ea";
              //
              var moreInfo = curr.children[6].innerHTML;
              var day = moreInfo.split(":")[0];
              //
              var indexOfFirstColon = moreInfo.indexOf(':');
              var indexOfFirstWhitespace = moreInfo.indexOf(' ');
              var time = moreInfo.substring(indexOfFirstColon+1, indexOfFirstWhitespace);
              //
              var place = moreInfo.substring(indexOfFirstWhitespace+1, moreInfo.length-1);
              //
              var teacher = curr.children[7].innerHTML;
              //
              strToCopy += (title + "$" + course + "$" + courseType + "$" + teacher + "$" + day  + "$" + time + "$" + place + "\r\n");
          }
          prompt("Ctrl+C", strToCopy);
      }
}