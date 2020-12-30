export class Satellite {
    name: string;
    orbitType: string;
    type: string;
    operational: boolean;
    launchDate: string;

    constructor(name: string, type: string, launchDate: string, orbitType: string, operational: boolean) {
      this.name = name;
      this.type = type;
      this.launchDate = launchDate;
      this.orbitType = orbitType;
      this.operational = operational;
    }

    get shouldShowWarning():boolean {      
      return (this.type.toLowerCase() == 'space debris'); 
    }
    
    loaded() {
      var tbl = document.getElementById("satelliteTable");
      if (tbl) {
        for (let idx=0,el,list=tbl.getElementsByTagName("TR"); idx<list.length; idx+=2) {
          if (!(el=list[idx]).classList.contains('oddRow'))
            el.add('oddRow');
        }
      }
    }
  }
  