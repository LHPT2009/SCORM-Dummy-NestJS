import { Injectable } from '@nestjs/common';
import { Scorm12API } from './SCORM/ScormAgain';

@Injectable()
export class AppService {
  private scormAPI: any;

  constructor() {
    // Khởi tạo SCORM API
    this.scormAPI = new Scorm12API();
  }

  /**
   * Initialize SCORM Session
   */
  initializeSCORM(): string {
    return this.scormAPI.LMSInitialize();
  }

  /**
   * Finish SCORM Session
   */
  finishSCORM(): string {
    return this.scormAPI.LMSFinish();
  }

  /**
   * Get Value from SCORM
   */
  getSCORMValue(CMIElement: string): string {
    return this.scormAPI.LMSGetValue(CMIElement);
  }

  /**
   * Set Value to SCORM
   */
  setSCORMValue(CMIElement: string, value: any): string {
    return this.scormAPI.LMSSetValue(CMIElement, value);
  }

  /**
   * Commit changes to SCORM
   */
  commitSCORM(): string {
    return this.scormAPI.LMSCommit();
  }

  /**
   * Get the last error from SCORM
   */
  getLastError(): string {
    return this.scormAPI.LMSGetLastError();
  }

  /**
   * Get the error string for a specific error code from SCORM
   */
  getErrorString(CMIErrorCode: string): string {
    return this.scormAPI.LMSGetErrorString(CMIErrorCode);
  }

  /**
   * Get diagnostic information for a specific error code
   */
  getDiagnostic(CMIErrorCode: string): string {
    return this.scormAPI.LMSGetDiagnostic(CMIErrorCode);
  }
}
